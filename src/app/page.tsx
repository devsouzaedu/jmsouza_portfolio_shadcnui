"use client";

// src/app/page.tsx
import Navbar from '@/components/Navbar';
import { Button } from '@/components/Button';
import { ContactButton } from '@/components/ContactButton'; // Novo import
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    // Ajusta a velocidade de reprodução dos vídeos para câmera lenta
    if (video1Ref.current) {
      video1Ref.current.playbackRate = 0.5;
    }
    if (video2Ref.current) {
      video2Ref.current.playbackRate = 0.5;
    }

    // Configura os eventos para alternar entre os vídeos
    const setupVideoEvents = () => {
      // Definir as funções de manipulação de eventos
      const handleVideo1End = () => {
        if (video2Ref.current) {
          video2Ref.current.currentTime = 0;
          video2Ref.current.play();
          setActiveVideo(2);
        }
      };
      
      const handleVideo2End = () => {
        if (video1Ref.current) {
          video1Ref.current.currentTime = 0;
          video1Ref.current.play();
          setActiveVideo(1);
        }
      };
      
      if (video1Ref.current && video2Ref.current) {
        // Quando o primeiro vídeo terminar, inicia o segundo e o torna visível
        video1Ref.current.addEventListener('ended', handleVideo1End);

        // Quando o segundo vídeo terminar, inicia o primeiro e o torna visível
        video2Ref.current.addEventListener('ended', handleVideo2End);
      }
      
      // Retornar as funções para que possam ser usadas na limpeza
      return { handleVideo1End, handleVideo2End };
    };

    // Armazenar as funções retornadas
    const { handleVideo1End, handleVideo2End } = setupVideoEvents();

    // Limpeza dos event listeners quando o componente for desmontado
    return () => {
      // Capturar as referências atuais para uso na função de limpeza
      const video1 = video1Ref.current;
      const video2 = video2Ref.current;
      
      if (video1) {
        video1.removeEventListener('ended', handleVideo1End);
      }
      if (video2) {
        video2.removeEventListener('ended', handleVideo2End);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        {/* Seção de Introdução */}
        <section 
          className="py-16 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
          style={{
            minHeight: '80vh',
            position: 'relative',
          }}
        >
          {/* Vídeos de fundo */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Primeiro vídeo */}
            <video 
              ref={video1Ref}
              autoPlay 
              muted 
              playsInline
              className="absolute w-full h-full object-cover transition-opacity duration-1000"
              style={{
                filter: 'blur(2px)',
                opacity: activeVideo === 1 ? 0.7 : 0,
              }}
            >
              <source src="/dots_video.mp4" type="video/mp4" />
            </video>
            
            {/* Segundo vídeo */}
            <video 
              ref={video2Ref}
              muted 
              playsInline
              className="absolute w-full h-full object-cover transition-opacity duration-1000"
              style={{
                filter: 'blur(2px)',
                opacity: activeVideo === 2 ? 0.7 : 0,
              }}
            >
              <source src="/dots_moving_2.mp4" type="video/mp4" />
            </video>
            
            {/* Gradiente para melhorar a legibilidade do texto */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 to-black/80"></div>
          </div>
          
          {/* Conteúdo diretamente sobre o vídeo, sem o card */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 animate-slideUp text-white">Olá, eu sou J.M Souza</h1>
            <p className="text-xl mb-8 max-w-3xl animate-slideUp text-white" style={{animationDelay: '0.2s'}}>
              Sou um desenvolvedor full-stack obcecado por criar soluções para os mais variados problemas.
              Minha paixão por tecnologia me impulsiona a buscar sempre o próximo desafio e transformar ideias
              em aplicações reais e funcionais. Com experiência em diversas linguagens e frameworks, estou sempre
              em busca de inovações e melhorias para tornar o mundo digital um lugar melhor.
            </p>
            <Button variant="default" size="lg" className="animate-slideUp" style={{animationDelay: '0.4s'}}>
              Confira meus projetos
            </Button>
          </div>
        </section>

        {/* Seção de Projetos */}
        <section id="projetos" className="py-16 bg-black">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Meus Projetos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Projeto 1 - Unia.App */}
              <Link href="https://unia-app-nail-designer.vercel.app" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_TGia9OiBNt.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Unia.App</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Uma plataforma inovadora que integra diversas soluções para entregar um canivete suiço para Nail designers.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 2 - HotAir */}
              <Link href="https://devsouzaedu.github.io/Hotair_Hot_air_balloon_game/" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_dd3DQtwf08.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">HotAir - Jogo de Balão Multiplayer</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um projeto que une tecnologia e criatividade (e muito Three.js) para criar um jogo de voo de balão de ar quente competitivo.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 3 - Libracom */}
              <Link href="https://libracomwindbanner.com.br" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/opera_s8bkasJJpo.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Libracom Wind Banners Site</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um site moderno e responsivo para a Libracom, com foco em design, SEO e Vendas, para a minha empresa de comunicação visual.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 4 - Dra. Cristiane */}
              <Link href="https://dra-cristiane-site.vercel.app/" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/dra_cris_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Dra. Cristiane</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Um site profissional para psicóloga clínica, com design elegante e focado na experiência do paciente, facilitando agendamentos e apresentando seus serviços.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Projeto 5 - Eduardo Libra */}
              <Link href="https://eduardo-libra-portfolio-2025.vercel.app/" target="_blank">
                <div
                  className="border border-gray-700 p-6 rounded-md shadow-sm bg-black hover:bg-gray-900 transition-colors relative overflow-hidden cursor-pointer flex flex-col h-full"
                  style={{
                    backgroundImage: `url(/eduardo_libra_bg.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white">Site - Eduardo Libra</h3>
                    <p className="mt-4 text-gray-300 flex-grow">
                      Portfolio artístico para especialista em obras de arte infláveis gigantes, exibindo criações impressionantes e oferecendo serviços para eventos e exposições.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Seção opcional de "Sobre mim" ou outros conteúdos */}
        <section id="sobre" className="py-16 bg-black">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-4">Sobre Mim</h2>
            <p className="text-lg text-gray-300">
              Desde cedo, sempre fui fascinado pela magia da tecnologia e o poder transformador da programação.
              Ao longo dos anos, desenvolvi habilidades tanto no front-end quanto no back-end, o que me permite
              criar soluções completas e integradas. Acredito que o futuro é construído hoje e estou comprometido
              em estar sempre um passo à frente, inovando e superando desafios.
            </p>
          </div>
        </section>

        {/* Seção de Contato */}
        <section className="py-8 bg-black flex justify-center">
          <ContactButton variant="default" size="lg" />
        </section>
      </main>
    </>
  );
}