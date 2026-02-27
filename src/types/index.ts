export type Gender = "male" | "female";
export type Category = "top" | "bottom" | "shoes" | "dress";

export interface Clothes {
    id: string;
    name: string;
    gender: Gender;
    category: Category;
    sub_category: string;
    image_url: string;
    price?: number | null;
    color: string | null;
    brand: string | null;
    product_url?: string | null;
    created_at: string;
}

export interface Person {
    id: string;
    name: string;
    gender: Gender;
    image_url: string;
}

export interface Outfit {
    id: string;
    outfitType: "regular" | "dress";
    image_url?: string | null;
    top?: Clothes | null;
    bottom?: Clothes | null;
    shoes: Clothes;
    dress?: Clothes | null;
}

export interface Wearing {
    top?: Clothes | null;
    bottom?: Clothes | null;
    shoes: Clothes;
    dress?: Clothes | null;
    outfitType: "regular" | "dress";
}

export interface OutfitFullResponse {
    person: Person;
    wearing: Wearing | null;
    recommendations: {
        top?: Clothes[];
        bottom?: Clothes[];
        shoes: Clothes[];
        dress?: Clothes[];
    } | null;
}

export interface PersonOutfitsResponse {
    person: Person;
    outfits: Outfit[];
}
