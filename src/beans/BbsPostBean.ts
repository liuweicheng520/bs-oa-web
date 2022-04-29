import {UserBean} from "@/beans/UserBean";

export interface BbsPostBean {

  /**
   * ID
   */
  id?: number;

  /**
   * 创建时间
   */
  createTime?: string;

  /**
   * 更新时间
   */
  updateTime?: string;

  /**
   * 用户ID
   */
  userId?: number;

  /**
   *
   */
  user?: UserBean;

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

  /**
   *
   */
  discussCount?: number;

  /**
   *
   */
  lastDiscussUsername?: string;

}