'use client'

import React ,{ useState, useEffect }from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  MessageCircle, 
  Shield, 
  Users,
  ChevronRight,
  Star,
  ArrowRight,
  Globe,
  Lock,
  Zap
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    content: "The best anonymous feedback platform I've ever used. Clean, simple, and effective.",
    author: "Product Manager",
    company: "Tech Startup",
    rating: 5
  },
  {
    content: "Transformed how we gather customer insights. The anonymity feature is a game-changer.",
    author: "Marketing Director",
    company: "Enterprise Corp",
    rating: 5
  },
  {
    content: "Incredibly intuitive interface with powerful features. Exactly what we needed.",
    author: "Team Lead",
    company: "Innovation Labs",
    rating: 5
  }
];

const features = [
  {
    icon: <MessageCircle className="h-6 w-6" />,
    title: "Anonymous Messaging",
    description: "Enable honest communication with complete privacy",
    gradient: "from-blue-600/20 to-blue-800/20",
    iconColor: "text-blue-500"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description: "Bank-grade encryption for your sensitive data",
    gradient: "from-purple-600/20 to-purple-800/20",
    iconColor: "text-purple-500"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global Scale",
    description: "Connect with users worldwide seamlessly",
    gradient: "from-green-600/20 to-green-800/20",
    iconColor: "text-green-500"
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Privacy First",
    description: "Advanced privacy controls and settings",
    gradient: "from-red-600/20 to-red-800/20",
    iconColor: "text-red-500"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description: "Work together while maintaining anonymity",
    gradient: "from-yellow-600/20 to-yellow-800/20",
    iconColor: "text-yellow-500"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-time Insights",
    description: "Instant feedback and analytics dashboard",
    gradient: "from-cyan-600/20 to-cyan-800/20",
    iconColor: "text-cyan-500"
  }
];


const timelineData = [
  {
    title: "Create Account",
    description: "Set up your organization's feedback space in minutes",
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Invite Team",
    description: "Add team members and set permissions",
    icon: <Lock className="h-5 w-5" />
  },
  {
    title: "Gather Feedback",
    description: "Start receiving anonymous, honest feedback",
    icon: <MessageCircle className="h-5 w-5" />
  },
  {
    title: "Analytics & Insights",
    description: "Track trends and make data-driven decisions",
    icon: <Zap className="h-5 w-5" />
  }
];

export default function Home() {

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

      {/* Navigation
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-[#0A0A0F]/75 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                TrueFeedback
              </span>
              <div className="hidden md:flex space-x-6">
                <Link href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#testimonials" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Testimonials
                </Link>
                <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-sm text-zinc-400 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav> */}
{/* 
<div className="fixed inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, #0A0A0F 70%)',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 relative z-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Anonymous Feedback
                </span>
                <br />
                Made Simple
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Empower your team with honest, anonymous feedback. Build trust and drive improvement with our secure platform.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button 
               
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href="/sign-up" >
                Start Free Trial
                </Link>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button 
                variant="outline" 
                size="lg"
                className="border-zinc-800 hover:bg-zinc-800/50"
              >
                Watch Demo
              </Button> */}
            </div>
            <div className="pt-8 flex items-center justify-center space-x-8 text-zinc-400">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">End-to-end Encrypted</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-sm">100+ Active Users</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2" />
                <span className="text-sm">Best For You</span>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-1/2 -right-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[120px]" />
          <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[120px]" />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need for
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ml-2">
                honest feedback
              </span>
            </h2>
            <p className="mt-4 text-zinc-400">
              Powerful features to help you gather and manage feedback effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-[#12121A] border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden group"
              >
                <CardHeader>
                  <div className={`p-3 w-fit rounded-xl bg-gradient-to-br ${feature.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription className="text-zinc-400">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative bg-[#0C0C14]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Loved by teams worldwide</h2>
            <p className="mt-4 text-zinc-400">See what our customers have to say</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-2">
                  <Card className="bg-[#12121A] border-white/5">
                    <CardContent className="p-6">
                      <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-zinc-300 mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex flex-col">
                        <span className="font-medium">{testimonial.author}</span>
                        <span className="text-sm text-zinc-400">{testimonial.company}</span>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="bg-[#12121A]/50 hover:bg-[#12121A] border-white/10" />
              <CarouselNext className="bg-[#12121A]/50 hover:bg-[#12121A] border-white/10" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <CardContent className="p-12 text-center relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to get started?
              </h3>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of teams already using TrueFeedback to improve their communication.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link href="/sign-up" >
                  Start Free Trial
                  </Link>
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                {/* <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  Schedule Demo
                </Button> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 'use client' */}

{/* // [Previous imports and code remain exactly the same until the footer section] */}

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 bg-[#0A0A0F]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Features</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Security</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">About</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Careers</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Privacy</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Terms</Link></li>
              <li><Link href="#" className="text-sm text-zinc-400 hover:text-white">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Raaaz.io
              </span>
              <span className="text-sm text-zinc-400">
                © {new Date().getFullYear()} Raaaz.io. A Saas Projecte create and copyright by Vyas Vishal.
              </span>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-zinc-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              {/* <Link href="#" className="text-zinc-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                </svg>
              </Link> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// export default Home;






