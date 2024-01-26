// BACKUP
import axios from 'axios';

const apiUrl = 'https://api.mymemory.translated.net/get';

async function fetchTranslations(text, sourceLang, targetLang) {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        q: text,
        langpair: `${sourceLang}|${targetLang}`,
      },
    });

    if (response.data.responseStatus !== 200) {
      throw new Error('Translation API error');
    }

    const translatedText = response.data.responseData.translatedText;
    return { [text]: translatedText };
  } catch (error) {
    console.error('Error fetching translations:', error);
    return {};
  }
}

export default fetchTranslations;
