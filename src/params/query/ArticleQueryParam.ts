export interface ArticleQueryParam {

  /**
   * ID
   */
  id?: number;

  /**
   * 文章名称
   */
  articleName?: string;

  /**
   * 文章类型
   */
  articleType?: string;

  /**
   * 数据
   */
  data?: string;

  /**
   * HTML
   */
  html?: string;

  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 附件文件
   */
  fileId?: number;

  /**
   * 其他信息
   */
  info?: object;

  sort?: string;

}