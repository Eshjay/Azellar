import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Database, Shield, Zap, Users, Clock, DollarSign } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([0])); // First item open by default

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqCategories = [
    {
      icon: Database,
      title: 'Database Services',
      questions: [
        {
          question: 'What types of databases do you work with?',
          answer: 'We work with all major database systems including PostgreSQL, MySQL, MongoDB, Oracle, SQL Server, Redis, Elasticsearch, and cloud databases like AWS RDS, Azure SQL, and Google Cloud SQL. Our team has deep expertise across relational, NoSQL, and cloud-native database technologies.',
        },
        {
          question: 'How do you approach database migrations?',
          answer: 'Our migration process follows a proven methodology: assessment and planning, schema mapping, data validation, pilot testing, phased migration with rollback procedures, and post-migration monitoring. We ensure zero data loss and minimal downtime through careful planning and execution.',
        },
        {
          question: 'Can you help with database performance optimization?',
          answer: 'Absolutely! We specialize in database performance tuning including query optimization, index strategy, resource allocation, and bottleneck identification. Our performance optimization services typically result in 2-10x performance improvements.',
        },
        {
          question: 'Do you provide database design services?',
          answer: 'Yes, we offer comprehensive database design services including data modeling, schema design, normalization, relationship mapping, and scalability planning. We ensure your database architecture supports current needs and future growth.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      questions: [
        {
          question: 'How do you ensure database security?',
          answer: 'We implement multi-layered security including encryption at rest and in transit, access controls, authentication mechanisms, audit logging, and regular security assessments. We follow industry best practices and compliance standards like SOC 2, HIPAA, and PCI DSS.',
        },
        {
          question: 'What compliance standards do you support?',
          answer: 'We help clients achieve and maintain compliance with HIPAA, PCI DSS, SOC 2, GDPR, SOX, and other industry-specific regulations. Our compliance services include gap analysis, implementation planning, and ongoing compliance monitoring.',
        },
        {
          question: 'How do you handle data backup and recovery?',
          answer: 'We design comprehensive backup strategies including automated backups, cross-region replication, point-in-time recovery, and disaster recovery planning. Our backup solutions are tested regularly to ensure data integrity and recovery reliability.',
        },
      ],
    },
    {
      icon: Zap,
      title: 'DevOps & Automation',
      questions: [
        {
          question: 'What DevOps services do you offer?',
          answer: 'We provide CI/CD pipeline setup, infrastructure as code, automated testing, deployment automation, monitoring and alerting, and containerization. Our DevOps services help streamline development workflows and improve deployment reliability.',
        },
        {
          question: 'How do you implement database CI/CD?',
          answer: 'We implement database CI/CD using tools like Liquibase, Flyway, or custom scripts integrated with your existing pipelines. This includes automated schema migrations, database testing, and deployment automation while maintaining data integrity.',
        },
        {
          question: 'Can you help with cloud migrations?',
          answer: 'Yes, we specialize in cloud migrations to AWS, Azure, and Google Cloud. Our cloud migration services include assessment, strategy development, execution, and optimization. We ensure minimal downtime and maximum performance in your cloud environment.',
        },
      ],
    },
    {
      icon: Users,
      title: 'Support & Training',
      questions: [
        {
          question: 'What support plans do you offer?',
          answer: 'We offer three support tiers: Standard (business hours, $2,500/month), Professional (extended hours with dedicated manager, $5,000/month), and Enterprise (24/7 with dedicated team, $10,000/month). Each plan includes monitoring, maintenance, and performance optimization.',
        },
        {
          question: 'Do you provide training for our team?',
          answer: 'Yes, we offer comprehensive training through Azellar Academy including database fundamentals, performance optimization, security best practices, and custom workshops. Our training programs are designed to upskill your team and reduce dependency on external consultants.',
        },
        {
          question: 'How quickly do you respond to support requests?',
          answer: 'Response times vary by support plan: Standard (4-24 hours), Professional (2-4 hours), Enterprise (15 minutes - 2 hours). Emergency support is available 24/7 for critical issues affecting production systems.',
        },
      ],
    },
    {
      icon: Clock,
      title: 'Project Timeline',
      questions: [
        {
          question: 'How long does a typical database project take?',
          answer: 'Project timelines vary based on complexity: Database optimization (2-4 weeks), migrations (4-12 weeks), new architecture design (6-16 weeks), and full infrastructure overhaul (12-24 weeks). We provide detailed timelines during project planning.',
        },
        {
          question: 'Can you work with tight deadlines?',
          answer: 'Yes, we understand business urgency and can accelerate project timelines when needed. We offer dedicated project teams and expedited services for critical projects. Additional resources and premium pricing may apply for rush projects.',
        },
        {
          question: 'How do you handle project changes?',
          answer: 'We use agile methodologies allowing for flexibility during project execution. Changes are managed through formal change requests with impact assessment on timeline and budget. Regular check-ins ensure alignment with evolving requirements.',
        },
      ],
    },
    {
      icon: DollarSign,
      title: 'Pricing & Contracts',
      questions: [
        {
          question: 'How do you price your services?',
          answer: 'We offer flexible pricing models: project-based fixed pricing, hourly consulting rates ($200-$500/hour), monthly retainers, and annual support contracts. Pricing depends on project complexity, timeline, and required expertise level.',
        },
        {
          question: 'Do you offer guarantees?',
          answer: 'Yes, we provide performance guarantees, uptime SLAs, and satisfaction guarantees. If you\'re not satisfied with our work, we\'ll work to make it right or provide a full refund for the unsatisfactory portion of the project.',
        },
        {
          question: 'What are your payment terms?',
          answer: 'For projects: 50% upfront, 50% on completion. For ongoing services: monthly billing in advance. We accept various payment methods including wire transfers, ACH, and major credit cards. Enterprise clients can negotiate custom payment terms.',
        },
        {
          question: 'Do you work with small businesses?',
          answer: 'Absolutely! We work with organizations of all sizes, from startups to Fortune 500 companies. We offer scaled solutions and pricing to meet the needs and budgets of small and medium businesses.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-r from-azellar-navy to-azellar-blue">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Frequently Asked <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Questions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Find answers to common questions about our database consulting and DevOps services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Get Your <span className="gradient-text">Answers</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Can't find what you're looking for? Contact our team for personalized assistance.
            </p>
          </motion.div>

          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-lg flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
                </div>

                <div className="space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    const isOpen = openItems.has(globalIndex);
                    
                    return (
                      <div
                        key={faqIndex}
                        className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-azellar-teal flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-azellar-teal flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                          >
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-12 shadow-lg"
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our team is here to help! Get in touch with us for personalized assistance and detailed answers to your specific questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="btn-primary text-lg px-8 py-4"
              >
                Contact Us
              </a>
              <a
                href="mailto:hello@azellar.com"
                className="btn-outline text-lg px-8 py-4"
              >
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-azellar-navy to-azellar-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Let's discuss your database challenges and create a solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Schedule Consultation
              </a>
              <a
                href="/services"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                Our Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;