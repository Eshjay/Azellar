import { motion } from 'framer-motion';
import { Database, Users, Award, Target, CheckCircle } from 'lucide-react';
import { OptimizedHeroSection, heroImages } from '../utils/heroImages';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, delivering solutions that exceed expectations.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their unique challenges and goals.',
    },
    {
      icon: Database,
      title: 'Innovation',
      description: 'We leverage cutting-edge technologies to solve complex database challenges.',
    },
    {
      icon: Award,
      title: 'Reliability',
      description: 'Our proven track record speaks to our commitment to delivering reliable solutions.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Technology Officer',
      bio: 'Former Lead Database Architect at Fortune 500 companies with 15+ years of experience.',
      expertise: ['PostgreSQL', 'MongoDB', 'AWS RDS', 'Performance Tuning'],
    },
    {
      name: 'Michael Chen',
      role: 'Senior DevOps Engineer',
      bio: 'Kubernetes and cloud infrastructure specialist with expertise in automation and CI/CD.',
      expertise: ['Kubernetes', 'Docker', 'CI/CD', 'Infrastructure as Code'],
    },
    {
      name: 'David Rodriguez',
      role: 'Database Security Specialist',
      bio: 'Cybersecurity expert focused on database security and compliance frameworks.',
      expertise: ['Security Audits', 'HIPAA', 'SOC 2', 'Access Controls'],
    },
    {
      name: 'Emily Davis',
      role: 'Solutions Architect',
      bio: 'Experienced in designing scalable database architectures for high-growth companies.',
      expertise: ['System Design', 'Scaling', 'Cloud Migration', 'Architecture'],
    },
  ];

  const milestones = [
    { year: '2018', event: 'Azellar founded with a vision to democratize database expertise' },
    { year: '2019', event: 'Completed first major enterprise migration (50TB+ database)' },
    { year: '2020', event: 'Launched Azellar Academy training programs' },
    { year: '2021', event: 'Achieved SOC 2 Type II certification' },
    { year: '2022', event: 'Expanded to serve clients across 15 countries' },
    { year: '2023', event: 'Reached 500+ successful project completions' },
    { year: '2024', event: 'Launched 24/7 enterprise support services' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-azellar-light via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <OptimizedHeroSection imageUrl={heroImages.about}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              About <span className="bg-gradient-to-r from-azellar-aqua to-azellar-cyan bg-clip-text text-transparent">Azellar</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              We're passionate about helping businesses unlock the full potential of their data through expert database consulting and DevOps solutions.
            </p>
          </motion.div>
        </div>
      </OptimizedHeroSection>

      {/* Mission & Vision */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To empower businesses with robust, scalable, and secure database solutions that drive innovation and growth. We believe that every organization deserves access to enterprise-grade database expertise, regardless of size or industry.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Our mission is to bridge the gap between complex database technologies and business objectives, making data management accessible, efficient, and strategic.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
                Our <span className="gradient-text">Vision</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                To be the global leader in database consulting, known for our innovation, reliability, and commitment to client success. We envision a world where businesses can focus on their core objectives while we handle the complexities of their data infrastructure.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're building a future where database management is not a barrier to innovation, but a catalyst for business transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Meet Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experienced professionals dedicated to your success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-azellar-teal font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{member.bio}</p>
                <div className="space-y-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-azellar-teal mr-2" />
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Key milestones in our mission to transform database consulting.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-azellar-navy to-azellar-teal"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg">
                      <div className="text-2xl font-bold gradient-text mb-2">{milestone.year}</div>
                      <p className="text-gray-600 dark:text-gray-300">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-full border-4 border-white dark:border-gray-800"></div>
                </motion.div>
              ))}
            </div>
          </div>
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
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Join hundreds of companies that trust Azellar for their database consulting needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="/contact"
                className="btn-secondary text-lg px-8 py-4 shadow-glow"
              >
                Start Your Project
              </a>
              <a
                href="/academy"
                className="btn-outline text-white border-white hover:bg-white hover:text-azellar-navy text-lg px-8 py-4"
              >
                Explore Training
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;