"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/multi-type-ripple-buttons";
import { Check } from "lucide-react";

const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const [backgroundColor, setBackgroundColor] = useState([0.04, 0.04, 0.04]);

  useEffect(() => {
    setBackgroundColor([0.04, 0.04, 0.04]);
  }, []);

  useEffect(() => {
    const gl = glRef.current;
    const program = glProgramRef.current;
    const location = glBgColorLocationRef.current;
    if (gl && program && location) {
      gl.useProgram(program);
      gl.uniform3fv(location, new Float32Array(backgroundColor));
    }
  }, [backgroundColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) { console.error("WebGL not supported"); return; }
    glRef.current = gl;

    const vertexShaderSource = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragmentShaderSource = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float angle){ float c=cos(angle),s=sin(angle); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){ return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0; }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff = center-uv;
        float len = length(diff);
        len += variation(diff,vec2(0.,1.),5.,2.);
        len -= variation(diff,vec2(1.,0.),5.,2.);
        float circle = smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv = gl_FragCoord.xy/iResolution.xy;
        uv.x *= 1.5; uv.x -= 0.25;
        float mask = 0.0;
        float radius = .35;
        vec2 center = vec2(.5);
        mask += paintCircle(uv,center,radius,.035).r;
        mask += paintCircle(uv,center,radius-.018,.01).r;
        mask += paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        vec3 goldColor = vec3(.79, .64, .16);
        vec3 brightGold = vec3(.91, .79, .42);
        vec3 foregroundColor = mix(goldColor, brightGold, sin(v.x+v.y+iTime)*.5+.5);
        vec3 color = mix(uBackgroundColor, foregroundColor, mask*.6);
        color = mix(color, vec3(1.), paintCircle(uv,center,radius,.003).r*.3);
        gl_FragColor = vec4(color, 1.);
      }`;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Could not create shader");
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compilation error");
      }
      return shader;
    };

    const program = gl.createProgram();
    if (!program) throw new Error("Could not create program");
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    glBgColorLocationRef.current = gl.getUniformLocation(program, "uBackgroundColor");
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animationFrameId: number;
    const render = (time: number) => {
      gl.uniform1f(iTimeLoc, time * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />;
};

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  buttonVariant?: "primary" | "secondary";
}

export const PricingCard = ({
  planName, description, price, period, features, buttonText, isPopular = false, buttonVariant = "primary"
}: PricingCardProps) => {
  const cardClasses = `
    backdrop-blur-[14px] bg-gradient-to-br rounded-2xl shadow-xl flex-1 max-w-xs px-7 py-8 flex flex-col transition-all duration-300
    from-white/5 to-black/0 border border-white/10
    dark:from-white/[0.07] dark:to-white/[0.02] dark:border-white/[0.08]
    ${isPopular ? "scale-105 relative ring-2 ring-gold-mid/40 dark:from-white/[0.12] dark:to-white/[0.06] dark:border-gold-mid/30 shadow-2xl shadow-gold-mid/10" : ""}
  `;

  return (
    <div className={cardClasses.trim()}>
      {isPopular && (
        <div className="absolute -top-4 right-4 px-3 py-1 text-[12px] font-semibold rounded-full bg-gold-mid text-black">
          Most Popular
        </div>
      )}
      <div className="mb-3">
        <h2 className="text-[48px] font-extralight tracking-[-0.03em] text-white font-display">{planName}</h2>
        <p className="text-[16px] text-text-muted mt-1 font-body">{description}</p>
      </div>
      <div className="my-6 flex items-baseline gap-2">
        <span className="text-[48px] font-extralight text-gold-light font-display">{price}</span>
        {period && <span className="text-[14px] text-text-muted font-body">{period}</span>}
      </div>
      <div className="w-full mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <ul className="flex flex-col gap-2 text-[14px] text-text-muted mb-6 font-body flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="text-gold-mid w-4 h-4 shrink-0" /> {feature}
          </li>
        ))}
      </ul>
      <RippleButton
        className={`mt-auto w-full py-2.5 rounded-xl font-semibold text-[14px] transition font-body ${
          buttonVariant === "primary"
            ? "bg-gold-mid hover:bg-gold-light text-black"
            : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
        }`}
      >
        {buttonText}
      </RippleButton>
    </div>
  );
};

interface ModernPricingPageProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  plans: PricingCardProps[];
  showAnimatedBackground?: boolean;
}

export const ModernPricingPage = ({
  title,
  subtitle,
  plans,
  showAnimatedBackground = true,
}: ModernPricingPageProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      {showAnimatedBackground && (
        <div className="absolute inset-0 z-0">
          <ShaderCanvas />
        </div>
      )}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl mx-auto text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gold-light text-xs uppercase tracking-[0.2em] font-medium">
              Packages
            </span>
            <h1 className="text-[48px] md:text-[64px] font-extralight leading-tight tracking-[-0.03em] font-display text-white mt-3 mb-4">
              {title}
            </h1>
            <p className="mt-3 text-[16px] md:text-[20px] text-text-muted max-w-2xl mx-auto font-body">
              {subtitle}
            </p>
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col md:flex-row gap-8 md:gap-6 justify-center items-center w-full max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.planName}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
              }}
            >
              <PricingCard key={plan.planName} {...plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
