export type Gender = "male" | "female";
export type Category = "top" | "bottom" | "shoes";

export interface Clothes {
    id: string;
    name: string;
    gender: Gender;
    category: Category;
    sub_category: string;
    image_url: string;
    color: string | null;
    brand: string | null;
    created_at: string;
}

export interface Person {
    id: string;
    name: string;
    gender: Gender;
    image_url: string;
}

export interface Wearing {
    top: Clothes;
    bottom: Clothes;
    shoes: Clothes;
}

export interface OutfitFullResponse {
    person: Person;
    wearing: Wearing | null;
    recommendations: {
        top: Clothes[];
        bottom: Clothes[];
        shoes: Clothes[];
    } | null;
}
