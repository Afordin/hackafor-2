interface Project {
  title: string;
  description: string;
  url: string;
}

/**
 * NOTE:
 * When adding a new project to the carousel,
 * please make sure to review the animation
 * in the `src/components/Carousel/Carousel.tsx` file.
 * Adding more than 4 projects will
 * break the animation and cause it to not function correctly.
 */
export const featureProjectsData: Array<Project> = [
  {
    title: 'Este es el primer',
    description:
      'Lorem ipsum dolor sit amet consectetur. Velit malesuada egestas tincidunt suspendisse elit pulvinar arcu. Vitae a senectus nisi est. Turpis fermentum odio id porttitor sed at dolor aliquam.',
    url: 'https://github.com/jarrisondev/hackafor-2'
  },
  {
    title: 'Título del proyecto',
    description:
      'Lorem ipsum dolor sit amet consectetur. Velit malesuada egestas tincidunt suspendisse elit pulvinar arcu. Vitae a senectus nisi est. Turpis fermentum odio id porttitor sed at dolor aliquam.',
    url: 'https://github.com/jarrisondev/hackafor-2'
  },
  {
    title: 'Título del proyecto',
    description:
      'Lorem ipsum dolor sit amet consectetur. Velit malesuada egestas tincidunt suspendisse elit pulvinar arcu. Vitae a senectus nisi est. Turpis fermentum odio id porttitor sed at dolor aliquam.',
    url: 'https://github.com/jarrisondev/hackafor-2'
  },
  {
    title: 'Título del proyecto',
    description:
      'Lorem ipsum dolor sit amet consectetur. Velit malesuada egestas tincidunt suspendisse elit pulvinar arcu. Vitae a senectus nisi est. Turpis fermentum odio id porttitor sed at dolor aliquam.',
    url: 'https://github.com/jarrisondev/hackafor-2'
  }
];
