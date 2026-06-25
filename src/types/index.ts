export type Symptom = {
  id: string
  name: string
  description: string | null
  sort_order: number | null
}

export type Nutrient = {
  id: string
  name: string
  category: string
  description: string | null
  foods: string[] | null
  daily_intake: string | null
  sort_order: number | null
}

export type SymptomNutrient = {
  symptom_id: string
  nutrient_id: string
  reason: string | null
  nutrients?: Nutrient
  symptoms?: Symptom
}
