export class SessionStorageService {
  // Сохранение данных
  static save<T>(key: string, data: T): void {
    try {
      const serializedData = JSON.stringify(data);
      sessionStorage.setItem(key, serializedData);
    } catch (error) {
      console.error("Ошибка при сохранении данных в sessionStorage:", error);
    }
  }

  // Получение данных
  static get<T>(key: string): T | null {
    try {
      const serializedData = sessionStorage.getItem(key);
      return serializedData ? JSON.parse(serializedData) : null;
    } catch (error) {
      console.error("Ошибка при получении данных из sessionStorage:", error);
      return null;
    }
  }

  // Удаление данных
  static remove(key: string): void {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("Ошибка при удалении данных из sessionStorage:", error);
    }
  }

  // Очистка всего sessionStorage
  static clear(): void {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("Ошибка при очистке sessionStorage:", error);
    }
  }
}
