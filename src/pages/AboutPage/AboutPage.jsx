import HomeLayout from "../../layout/HomeLayout";

function About() {
    return (
    <>
        <HomeLayout>
        <div className="p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">About TechnoGears</h1>
      <br />
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed">
          At Grocrea, our mission is to provide you with the freshest and highest quality groceries at the most competitive prices. We are committed to making your grocery shopping experience convenient, easy, and enjoyable. With our wide selection of products, fast delivery, and exceptional customer service, we strive to be your go-to online grocery store.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Grocrea was founded with the idea of bringing fresh groceries directly to your doorstep. What started as a small, family-run business has now grown into a leading online grocery store, serving customers across the country. We believe that everyone deserves access to fresh and nutritious food, and we work hard to make that a reality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed">
          <li>Wide selection of fresh and organic products</li>
          <li>Competitive prices with regular discounts and offers</li>
          <li>Fast and reliable delivery service</li>
          <li>Exceptional customer support</li>
          <li>User-friendly website and easy-to-navigate categories</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h2>
        <p className="text-gray-700 leading-relaxed">
          We believe in transparency, sustainability, and community. Our values guide us in everything we do, from sourcing our products to delivering them to your door. We are committed to reducing our environmental impact and supporting local farmers and suppliers.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Us on Our Journey</h2>
        <p className="text-gray-700 leading-relaxed">
          Thank you for choosing Grocrea as your trusted grocery provider. We are excited to serve you and to be a part of your daily life. Together, let's make grocery shopping a pleasant and stress-free experience.
        </p>
      </section>
    </div>
    <br />
        </HomeLayout>
    </>
    );
}

export default About;
