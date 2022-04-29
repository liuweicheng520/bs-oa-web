export interface BbsPostParam {

  /**
   * 用户ID
   */
  userId?: number;

  /**
   * 贴子 名称
   */
  postName?: string;

  /**
   * 帖子标签
   */
  postTags?: string[];

  /**
   * 内容
   */
  content?: string;

  /**
   * 附件文件
   */
  fileId?: number;

  /**
   * 其他信息
   */
  info?: object;

}