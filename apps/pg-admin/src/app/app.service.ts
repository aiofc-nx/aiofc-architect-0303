import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  private readonly message = `# **在2011年中国科学院院士**\n
  评选中，施一公和饶毅两个学界明星双双落选，\n
  引发了舆论对中科院的质疑。2011年12月9日，在新增院士名单出炉后数小时，\n
  饶毅便发表了一篇标题为 **《解剖"逆淘汰"社会现象的一只麻雀》** 的4000余字博文[17]，\n
  为施一公的落选鸣不平。饶毅认为，中科院在院士评选中，重视的不是学术水平、年龄、学术年资、\n
  ![饶毅](https://www.baidu.com/img/flexible/logo/pc/result.png)\n
  在国内科学贡献大小，而是"在有些人面前低头排队时间的长短"。饶毅当时宣布不再参选院士[18]。而后，\n
  施一公在2013年院士评选中当选中科院院士 **[谭志翀](https://www.baidu.com)**。`;
  // private readonly message = 'Hello pg-admin API!!!';
  getData(): Observable<{ message: string }> {
    return of({ message: this.message });
  }
}
