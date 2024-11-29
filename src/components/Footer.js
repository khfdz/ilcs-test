import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaDribbble,
} from "react-icons/fa";

const socialLinks = [
  { icon: <FaFacebookF />, name: "Facebook", href: "#" },
  { icon: <FaInstagram />, name: "Instagram", href: "#" },
  { icon: <FaTwitter />, name: "Twitter", href: "#" },
  { icon: <FaGithub />, name: "GitHub", href: "#" },
  { icon: <FaDribbble />, name: "Dribbble", href: "#" },
];

const services = ["Pengembangan Web"];
const about = ["Tentang Kami", "Karir", "Sejarah", "Tim Kami"];
const support = ["FAQ", "Kontak", "Obrolan Langsung"];

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <h2 className="text-center text-xl font-bold text-gray-900 sm:text-3xl">
            Jangan ketinggalan berita terbaru dari kami !
          </h2>
          <form className="mt-6">
            <div className="relative max-w-lg">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="khfdz@gmail.com"
                className="w-full rounded-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-yellow2 px-5 py-3 text-sm font-medium text-black transition"
              >
                Berlangganan
              </button>
            </div>
          </form>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-32">
          <div className="mx-auto max-w-sm lg:max-w-none">
            <p className="mt-4 text-center text-gray-500 lg:text-left lg:text-lg">
              Pak Olin Parkir Online memberikan solusi parkir yang mudah dan
              efisien. Akses parkir dengan cepat dan mudah di lokasi yang
              terdekat.
            </p>
            <div className="mt-6 flex justify-center gap-4 lg:justify-start">
              {socialLinks.map(({ icon, name, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 transition hover:text-gray-700/75"
                  aria-label={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center lg:grid-cols-3 lg:text-left">
            {[
              { title: "Layanan", links: services },
              { title: "Tentang", links: about },
              { title: "Dukungan", links: support },
            ].map(({ title, links }, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <ul className="mt-6 space-y-1">
                  {links.map((link, i) => (
                    <li key={i}>
                      <a
                        href="/"
                        className="text-gray-700 transition hover:text-gray-700/75"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-gray-100 pt-8">
          <p className="text-center text-xs text-gray-500">
            <p>Untuk Test PT Integrasi Logistik Cipta Solusi</p>
            <br />
            ©khfdz 2024. Semua hak cipta dilindungi.
            <br />
            Dibuat dengan{" "}
            <a
              href="/"
              className="text-gray-700 underline transition hover:text-gray-700/75"
            >
              React
            </a>{" "}
            dan{" "}
            <a
              href="/"
              className="text-gray-700 underline transition hover:text-gray-700/75"
            >
              Tailwind
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
