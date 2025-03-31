"use client";

import React from "react";
import { 
  motion,
  AnimatePresence,
  type HTMLMotionProps,
  type Variants
} from 'framer-motion';

// Re-export AnimatePresence
export { AnimatePresence };

// Re-export framer-motion types
export type { HTMLMotionProps, Variants };

// Create a Motion object with commonly used elements
const Motion = {
  div: motion.div,
  span: motion.span,
  button: motion.button,
  img: motion.img,
  ul: motion.ul,
  li: motion.li,
  a: motion.a,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  svg: motion.svg,
  path: motion.path,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  nav: motion.nav,
  form: motion.form,
  input: motion.input
};

export default Motion; 