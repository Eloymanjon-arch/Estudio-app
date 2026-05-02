export async function handler(event) {
  try {
    const { text } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "Eres un experto generador de exámenes tipo test para oposiciones."
          },
          {
            role: "user",
            content: `
Genera 10 preguntas tipo test con 4 opciones cada una.

Formato JSON:
[
 { "pregunta": "...", "opciones": ["A","B","C","D"], "correcta": 0 }
]

Texto:
${text.slice(0, 6000)}
`
          }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: data.choices[0].message.content
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: "Error generando test"
    };
  }
}