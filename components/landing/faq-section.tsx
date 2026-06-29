"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "How do I integrate AegisMesh with my AI agents?",
    answer:
      "AegisMesh provides a lightweight SDK for Python, Node.js, and Go. Simply wrap your agent's HTTP client with our interceptor, and all requests will be automatically routed through the Zero-Trust Gateway. Setup takes less than 5 minutes with our CLI tool.",
  },
  {
    question: "What happens when a request is blocked?",
    answer:
      "Blocked requests return a structured JSON response with the policy rule that triggered the block, a unique audit trail ID, and suggested remediation steps. Your agent can handle this gracefully using our SDK's built-in error handling patterns.",
  },
  {
    question: "Can I create custom security policies?",
    answer:
      "Yes. AegisMesh supports a powerful policy DSL that lets you define rules based on agent identity, target IP ranges, action types, time windows, and request patterns. Policies can be version-controlled and deployed via our API or the SOC Dashboard.",
  },
  {
    question: "How does the Aurora DSQL audit logging work?",
    answer:
      "Every intercepted request is logged to Amazon Aurora DSQL with microsecond precision. Logs are automatically replicated across your configured AWS regions for compliance and disaster recovery. You can query logs via SQL or our GraphQL API.",
  },
  {
    question: "What's the latency impact on my AI agents?",
    answer:
      "AegisMesh adds less than 50 microseconds of latency per request. Our gateway runs at the edge using a global network of points of presence, ensuring minimal impact on your agent's performance regardless of geographic location.",
  },
  {
    question: "Do you support on-premise deployment?",
    answer:
      "Yes, our Enterprise and Custom plans include on-premise deployment options. AegisMesh can run in your own Kubernetes cluster, VPC, or air-gapped environment. We provide Helm charts and Terraform modules for automated deployment.",
  },
];

const codeTabs = ["Python", "Node.js", "cURL"] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="api-docs" className="py-32 relative">
      <motion.div
        ref={sectionRef}
        className="max-w-4xl mx-auto px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            className="text-xs tracking-[0.3em] text-emerald-400 font-mono uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            DEVELOPER API &amp; SUPPORT
          </motion.p>
          <motion.h2
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything You Need to Integrate
          </motion.h2>
          <motion.p
            className="text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Common questions about integrating AegisMesh into your AI agent
            infrastructure. Can&apos;t find what you need? Reach out to our
            developer support team.
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.02] border border-white/[0.06] rounded-xl mb-3 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors text-left"
              >
                <span className="text-white font-medium pr-4">
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25, delay: 0.05 },
                    }}
                  >
                    <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        {/* Code Snippet Preview */}
        <motion.div
          className="bg-[#0a0f1a] border border-white/[0.06] rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {/* Tab Bar */}
          <div className="flex items-center border-b border-white/[0.06] px-4">
            {codeTabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-3 text-xs font-mono transition-colors relative ${
                  tab === "Python"
                    ? "text-emerald-400"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {tab}
                {tab === "Python" && (
                  <motion.div
                    layoutId="codeTab"
                    className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Code Content */}
          <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
            <div>
              <span className="text-indigo-400">from</span>{" "}
              <span className="text-cyan-400">aegismesh</span>{" "}
              <span className="text-indigo-400">import</span>{" "}
              <span className="text-cyan-400">SecureClient</span>
            </div>
            <div className="h-5" />
            <div>
              <span className="text-white">client</span>{" "}
              <span className="text-indigo-400">=</span>{" "}
              <span className="text-cyan-400">SecureClient</span>
              <span className="text-white">(</span>
            </div>
            <div className="pl-8">
              <span className="text-white">agent_id</span>
              <span className="text-indigo-400">=</span>
              <span className="text-emerald-400">
                &quot;research-bot-alpha&quot;
              </span>
              <span className="text-white">,</span>
            </div>
            <div className="pl-8">
              <span className="text-white">api_key</span>
              <span className="text-indigo-400">=</span>
              <span className="text-white">os</span>
              <span className="text-slate-400">.</span>
              <span className="text-white">environ</span>
              <span className="text-white">[</span>
              <span className="text-emerald-400">
                &quot;AEGIS_API_KEY&quot;
              </span>
              <span className="text-white">]</span>
            </div>
            <div>
              <span className="text-white">)</span>
            </div>
            <div className="h-5" />
            <div>
              <span className="text-slate-500">
                # All requests are now zero-trust verified
              </span>
            </div>
            <div>
              <span className="text-white">response</span>{" "}
              <span className="text-indigo-400">=</span>{" "}
              <span className="text-white">client</span>
              <span className="text-slate-400">.</span>
              <span className="text-cyan-400">get</span>
              <span className="text-white">(</span>
              <span className="text-emerald-400">
                &quot;https://api.target.com/data&quot;
              </span>
              <span className="text-white">)</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
