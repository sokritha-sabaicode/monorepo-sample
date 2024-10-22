import UserSearchHistoryModel from "@/src/database/models/search.model";


class SearchJobRepository {
  async saveSearchHistory(userId: string | null, query: string) {
    try {
      const searchHistory = new UserSearchHistoryModel({
        userId, // This could be null for anonymous users
        query,
      });
      await searchHistory.save();
    } catch (error) {
      console.error(`SearchJobRepository saveSearchHistory() method error::: `, error);
      throw error;
    }
  }

  async getSearchHistory(userId: string): Promise<string[]> {
    try {
      const history = await UserSearchHistoryModel.find({ userId })
        .sort({ timestamp: -1 }) // Sort by most recent searches
        .limit(5);

      return history.map(item => item.query); // Return only the search queries
    } catch (error) {
      console.error(`SearchJobRepository getSearchHistory() method error::: `, error);
      throw error;
    }
  }

  async getTrendingSearches(): Promise<string[]> {
    try {
      const trending = await UserSearchHistoryModel.aggregate([
        {
          $group: {
            _id: { $toLower: "$query" }, // Normalize to lowercase
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } }, // Sort by most frequent
        { $limit: 5 }, // Limit to top 5 trending searches
      ]);

      return trending.map(item => item._id);
    } catch (error) {
      console.error(`SearchJobRepository getTrendingSearches() method error::: `, error);
      throw error;
    }
  }
}

export default new SearchJobRepository();
