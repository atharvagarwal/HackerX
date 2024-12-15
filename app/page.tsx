"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/HeroParallax";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import Footer from "@/components/ui/Footer";

export default function Home() {
  const navItems = [
    {
      name: "SignIn",
      link: "/signin",
    },
    {
      name: "Discover",
      link: "/v1/discover",
    },
  ];
  return (
    <div>
      <FloatingNav navItems={navItems} />
      <HeroParallax products={products} />
      <Footer/>
    </div>
  );
}
const products = [
  {
    title: "Project 1",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-vector/user-panel-business-dashboard_23-2148360325.jpg?t=st=1734097003~exp=1734100603~hmac=244e507f7590dcf9abc40b2f84a9224eff1706187ebc83ef199c00feea5f6aa9&w=996",
  },
  {
    title: "Project 2",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-ui-ux-landing-page_52683-69534.jpg?t=st=1734097070~exp=1734100670~hmac=e95cd6462e1b52d447ece7e53cffb13fabef6db5d04df2a5c8b97eacad766a54&w=996",
  },
  {
    title: "Project 3",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-psd/online-publicity-web-template-restaurant_23-2148360484.jpg?t=st=1734097097~exp=1734100697~hmac=50c846d2457eadd308d6037494100960e2abe8f0197a43df753aa3065eb34393&w=1380",
  },
  {
    title: "Project 4",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-vector/gradient-ui-ux-landing-page_52683-70955.jpg?t=st=1734097140~exp=1734100740~hmac=c5b2ef3099dc13225318b9b41db602c3e6868e063d2e588cee77762fbb2064fc&w=996",
  },

  {
    title: "Project 5",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-vector/smart-home-management-application_23-2148627768.jpg?t=st=1734097257~exp=1734100857~hmac=3ebb8a919df9d36d702fa3685a3e45d726f3e1e1a2a2af49e3c24098b590470e&w=996",
  },
  {
    title: "Project 6",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-psd/american-food-template-concept_23-2148474729.jpg?t=st=1734097458~exp=1734101058~hmac=471697ed159cef35a3b44ebce65563e84eea62d9610c1931065a1ae486bf737d&w=1380",
  },
  {
    title: "Project 7",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-psd/brunch-concept-website-template_23-2148465816.jpg?t=st=1734097472~exp=1734101072~hmac=c39c94f3368255c0b9053a4cf5211b603205a4b76c0ce41a601ee2daf56303a3&w=1380",
  },
  {
    title: "Project 8",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-vector/dashboard-business-user-panel_23-2148367766.jpg?t=st=1734097486~exp=1734101086~hmac=4144dafa2fe5c8197fb0a61897c442dfda530700b50163807dd12234dc89456e&w=996",
  },
  {
    title: "Project 9",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-psd/let-s-go-hiking-landing-page-screen_23-2148511267.jpg?t=st=1734097504~exp=1734101104~hmac=b684a11eed22e84fb098ce9e2f5b21fefc27502314b5d34bca991a066ba778d8&w=1380",
  },
  {
    title: "Project 10",
    link: "/",
    thumbnail:
      "https://img.freepik.com/free-psd/flat-design-business-template-design_23-2151076749.jpg?t=st=1734097533~exp=1734101133~hmac=d0b9bc84397e1bd7d8a60b32a85a6910feb60eae7cb0c1d84e7c89b00c8a6cdd&w=1380",
  },
];
