export const GEMINI_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {
            "type": "string",
            "description": "The title of the recipe"
        },
        "duration": {
            "type": "string",
            "description": "The cooking duration of the recipe"
        },
        "ingredients": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of ingredients needed for the recipe"
        },
        "steps": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "List of cooking steps"
        },
        "notes": {
            "type": "array",
            "items": {
                "type": "string"
            },
            "description": "Additional notes or tips for the recipe"
        }
    },
    "required": [
        "title",
        "ingredients",
        "steps"
    ],
    "propertyOrdering": [
        "title",
        "duration",
        "ingredients",
        "steps",
        "notes"
    ]
}