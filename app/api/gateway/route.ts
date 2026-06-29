import { NextResponse } from 'next/server';
import { AuroraDSQLClient } from '@aws/aurora-dsql-node-postgres-connector';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { agentId, attemptedAction, targetIp } = body;

    let status = 'ALLOWED';
    const lowerAction = (attemptedAction || '').toLowerCase();
    
    // Zero-Trust Security checks
    if (
      lowerAction.includes('nmap') ||
      lowerAction.includes('port scan') ||
      (targetIp && targetIp.startsWith('10.0.'))
    ) {
      status = 'BLOCKED';
    }

    // Log to Aurora DSQL if endpoint is configured
    if (process.env.DSQL_ENDPOINT) {
      const client = new AuroraDSQLClient({
        endpoint: process.env.DSQL_ENDPOINT,
      });

      await client.connect();
      
      const query = `
        INSERT INTO security_audit_logs (agent_id, attempted_action, target_ip, status, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `;
      
      await client.query(query, [agentId, attemptedAction, targetIp, status]);
      
      await client.end();
    }

    if (status === 'BLOCKED') {
      return NextResponse.json({ status, message: 'Action blocked by security policy.' }, { status: 403 });
    }

    return NextResponse.json({ status, message: 'Action allowed.' });
    
  } catch (error) {
    console.error('Gateway Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
