/**
 * Represents a hero.
 */
export interface Hero {
    /** Unique identifier (e.g., "batman") */
    id: string;

    /**  Main image (e.g., "dc-batman") */
    img: string;

    /** Name of the superhero (e.g., "Batman") */
    superhero: string;

    /** Publisher (e.g., "DC Comics") */
    publisher: string;

    /** Alter ego (e.g., "Bruce Wayne") */
    alter_ego: string;

    /** First appearance (e.g., "Detective Comics #27") */
    first_appearance: string;

    /** Alternative image (can be null) */
    alt_img: string | null;
}
