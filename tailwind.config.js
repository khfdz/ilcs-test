module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        // Car 1: Mundur dari kiri dengan belok dan gas tipis-tipis
        carReverseLeft: {
          "0%": { transform: "translateX(-150%) rotate(200deg)" }, // Mulai dengan sedikit belokan
          "40%": { transform: "translateX(-50px) rotate(180deg)" }, // Koreksi ke posisi lurus
          "80%": { transform: "translateX(60px) rotate(180deg)" }, // Sedikit maju
          "90%": { transform: "translateX(40px) rotate(180deg)" }, // Mundur tipis
          "100%": { transform: "translateX(50px) rotate(180deg)" }, // Berhenti
        },
        // Car 2: Maju dari kanan dengan belok dan gas tipis-tipis
        carForwardRight: {
          "0%": { transform: "translateX(450%) rotate(-15deg)" }, // Mulai dengan sedikit belokan
          "50%": { transform: "translateX(20px) rotate(0deg)" }, // Koreksi ke posisi lurus
          "80%": { transform: "translateX(-40px) rotate(0deg)" }, // Mundur tipis
          "90%": { transform: "translateX(-60px) rotate(0deg)" }, // Maju tipis
          "100%": { transform: "translateX(-50px) rotate(0deg)" }, // Berhenti
        },
      },
      animation: {
        "car-reverse-left": "carReverseLeft 6s ease-in-out forwards", // Mobil mundur lebih lambat
        "car-forward-right": "carForwardRight 8s ease-in-out forwards", // Mobil maju lebih cepat
      },
      boxShadow: {
        'custom-xl': '0px 4px 10px 1px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'blue1': '#0060a7',
        'yellow1': '#fee580',
        'yellow2': '#ffcc00',
        'gray1': '#f3f7fa',
      },
      fontFamily: {
        gilda: ['Gilda Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
