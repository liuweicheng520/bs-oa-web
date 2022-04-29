export interface SchoolParam {

  schoolName?: string;

  /**
   * 地区
   */
  area?: string;

  /**
   * 隶属
   */
  belong?: string;

  /**
   * 特性 研究生院
   */
  featureYjs?: boolean;

  /**
   * 特性 自划线
   */
  featureZhx?: boolean;

  /**
   * 学校url
   */
  schoolUrl?: string;

  /**
   * 院校简介
   */
  introduce?: string;

  /**
   * 院系设置
   */
  college?: string;

  /**
   * 专业介绍
   */
  major?: string;

  /**
   * 录取规则
   */
  rule?: string;

  /**
   * 调剂政策
   */
  dispensing?: string;

  times?: number;

  /**
   * 其他信息
   */
  info?: object;

}