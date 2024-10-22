import searchRepository from "@/src/database/repositories/search.repository";
import { AuthenticationError } from "@sokritha-sabaicode/ms-libs";


class SearchJobService {
  async saveSearchHistory(userId: string | null, query: string) {
    try {
      await searchRepository.saveSearchHistory(userId, query)

    } catch (error) {
      console.error(`SearchJobService saveSearchHistory() method error::: `, error);
      throw error;
    }
  }

  async getSearchHistory(userId: string): Promise<string[]> {
    try {
      console.log('userId::: ', userId)
      if (!userId) throw new AuthenticationError();

      const searchHistory = await searchRepository.getSearchHistory(userId);

      return searchHistory;
    } catch (error) {
      console.error(`SearchJobService getSearchHistory() method error::: `, error);
      throw error;
    }
  }

  async getTrendingSearches(): Promise<string[]> {
    try {
      const trendingSearches = await searchRepository.getTrendingSearches();

      return trendingSearches;
    } catch (error) {
      console.error(`SearchJobService getTrendingSearches() method error::: `, error);
      throw error;
    }
  }
}

export default new SearchJobService();
