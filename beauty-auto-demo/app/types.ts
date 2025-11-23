export interface AnalysisResult {
    skin_character_id?: string;
    skin_character_name: string;
    character_description: string;
    summary: string;
    skincare_advice: string;
    cosme_status?: 'recognized' | 'unrecognized' | 'not_provided';
    cosme_analysis: string;
    cosme_optimization: string;
    product_suggestions: string[];
    scores: {
        水分: number;
        弾力: number;
        透明感: number;
        キメ: number;
        抵抗力: number;
    };
    spot_diagnosis?: {
        area: string;
        concern: string;
        advice: string;
    }[];
}
