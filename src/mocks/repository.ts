/**
 * ### 저장소 Class를 정의하자.
 */

type RepositoryType = 'localStorage' | 'sessionStorage';

export default class Repository<T = unknown> {
  private readonly key: string;
  private readonly repositoryType: RepositoryType;

  constructor(key: string, repositoryType: RepositoryType = 'localStorage') {
    this.key = key;
    this.repositoryType = repositoryType;
  }

  get(): T | null {
    const value = window[this.repositoryType].getItem(this.key);
    return value ? JSON.parse(value) : null;
  }

  set(value: T): void {
    window[this.repositoryType].setItem(this.key, JSON.stringify(value));
  }

  remove(): void {
    window[this.repositoryType].removeItem(this.key);
  }
}
