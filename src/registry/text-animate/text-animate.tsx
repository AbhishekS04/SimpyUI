"use client"

import { motion, type Variants, type Transition } from "framer-motion"
import { useMemo } from "react"

export type AnimationType = "fadeUp" | "fadeDown" | "fadeIn" | "blur" | "typewriter" | "wave" | "scale" | "slideLeft" | "slideRight"
export type SplitBy = "character" | "word"

export interface TextAnimateProps {
  text: string
  type?: AnimationType
  splitBy?: SplitBy
  delay?: number
  duration?: number
  stagger?: number
  className?: string
  once?: boolean
}

const getVariants = (type: AnimationType): Variants => {
  switch (type) {
    case "fadeUp":
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
    case "fadeDown":
      return {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      }
    case "fadeIn":
      return {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    case "blur":
      return {
        hidden: { opacity: 0, filter: "blur(12px)" },
        visible: { opacity: 1, filter: "blur(0px)" },
      }
    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 },
      }
    case "slideLeft":
      return {
        hidden: { opacity: 0, x: 40 },
        visible: { opacity: 1, x: 0 },
      }
    case "slideRight":
      return {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0 },
      }
    case "wave":
      return {
        hidden: { opacity: 0, y: 20, rotateZ: -5 },
        visible: { opacity: 1, y: 0, rotateZ: 0 },
      }
    case "typewriter":
      return {
        hidden: { opacity: 0, width: 0 },
        visible: { opacity: 1, width: "auto" },
      }
    default:
      return {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }
  }
}

export default function TextAnimate({
  text,
  type = "fadeUp",
  splitBy = "character",
  delay = 0,
  duration = 0.5,
  stagger = 0.03,
  className = "",
  once = true,
}: TextAnimateProps) {
  const items = useMemo(() => {
    if (splitBy === "word") return text.split(" ")
    return text.split("")
  }, [text, splitBy])

  const variants = getVariants(type)

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const childTransition: Transition = {
    duration,
    ease: [0.22, 1, 0.36, 1],
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={variants}
          transition={childTransition}
          className="inline-block whitespace-pre"
        >
          {item}
          {splitBy === "word" && i < items.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  )
}
