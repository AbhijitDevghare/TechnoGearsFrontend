export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#01162b] text-white">
      {/* Hero Section */}
      <section className="flex items-center justify-center text-center px-6 py-24">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            About Electro Store
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Electro Store is a technology-focused e-commerce platform built to deliver
            reliable, secure, and seamless electronics shopping at scale.
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-2xl font-medium mb-4">Who We Are</h2>
            <p className="text-slate-300 leading-relaxed">
              Inspired by industry leaders like Amazon and Flipkart, Electro Store
              focuses on building trust through quality products, transparent pricing,
              and dependable service.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Our platform is designed using scalable architecture to ensure speed,
              security, and reliability as we grow.
            </p>
          </div>

          <div className="bg-[#021f3d] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-medium mb-4">What We Do</h2>
            <p className="text-slate-300 leading-relaxed">
              We connect customers with a wide range of electronics including
              smartphones, laptops, accessories, and home tech essentials.
            </p>
            <p className="text-slate-300 leading-relaxed mt-4">
              Every product listed on Electro Store goes through quality verification
              to ensure authenticity and performance.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#021f3d] px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-medium text-center mb-14">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-[#01162b] rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-medium mb-2">Customer Obsession</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Customers are at the center of every decision we make.
              </p>
            </div>

            <div className="bg-[#01162b] rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-medium mb-2">Trust & Security</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Secure payments, authentic products, and transparent processes.
              </p>
            </div>

            <div className="bg-[#01162b] rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-medium mb-2">Scalable Technology</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Built to perform reliably at high scale and traffic.
              </p>
            </div>

            <div className="bg-[#01162b] rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-medium mb-2">Long-Term Focus</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                We value lasting relationships over short-term gains.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-medium mb-6">Built on Trust</h2>
          <p className="text-slate-300 leading-relaxed">
            Electro Store follows industry-standard security practices, trusted payment
            gateways, and reliable logistics partners to ensure safe and timely delivery.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="border-t border-slate-700 py-10 text-center">
        <p className="text-slate-400">
          Electro Store — A trusted destination for modern electronics.
        </p>
      </footer>
    </div>
  );
}
