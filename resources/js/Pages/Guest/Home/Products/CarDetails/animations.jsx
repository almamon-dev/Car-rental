/**
 * Car Details - Motion Variants
 * 
 * Defines standardized animation protocols for transition effects and 
 * component entry protocols across the car details domain.
 * 
 * @author AL Mamon
 * @version 1.0.0
 */

export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

export const transition = {
    duration: 0.5,
    ease: "easeOut",
};
