export interface FileBean {

  id?: number;

  createTime?: string;

  updateTime?: string;

  /**
   * file token
   */
  token?: string;

  /**
   * 文件名
   */
  filename?: string;

  /**
   * 扩展名
   */
  ext?: string;

  /**
   * 文件
   */
  fileId?: number;

}