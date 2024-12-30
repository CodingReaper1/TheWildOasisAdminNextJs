"use client";

import { MotionProps, motion } from "framer-motion";
import React from "react";

type MotionDivTypes = {
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
  className?: string;
  reactRef?: React.Ref<unknown>;
  id?: string;
  onClick?: () => void;
  ariaLabel?: string;
} & MotionProps;

// To return motion.anyHtmlTag, becouse i dont want to make something like entire home page client side + its flexible, i know it hurts your eyes but it works :D
function MotionComponent({
  as: component = "div",
  children,
  className,
  reactRef,
  id,
  onClick,
  ariaLabel,
  ...rest
}: MotionDivTypes) {
  const MComponent = motion[
    component as keyof typeof motion
  ] as React.ElementType;

  // const Component = component as React.ElementType;

  return (
    <MComponent
      id={id}
      onClick={onClick}
      ref={reactRef}
      className={className}
      aria-label={ariaLabel}
      viewport={{ once: true }}
      {...rest}
    >
      {children}
    </MComponent>
  );
}

export default MotionComponent;
