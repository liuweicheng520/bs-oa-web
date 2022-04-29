/**
 * 文章
 */
import {FileBean} from "@/beans/FileBean";
import {UserBean} from "@/beans/UserBean";

export interface ArticleBean {

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
   * 用户
   */
  user?: UserBean;

  /**
   * 附件文件
   */
  fileId?: number;

  /**
   * 附件文件
   */
  file?: FileBean;

  /**
   * 视频地址
   */
  videoUrl?: string;

  /**
   * 浏览次数
   */
  times?: number;

  /**
   * 其他信息
   */
  info?: object;

  /**
   * 
   */
  commentTimes?: number;
  isCollect?:number;
}