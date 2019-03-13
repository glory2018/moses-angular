import {Component, OnInit} from '@angular/core';
import {ReportService} from "../services/report.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportSrc: string;
  imgsrc = 'https://c.staticblitz.com/assets/client/components/SideMenu/blitz_logo-11cebad97cad4b50bc955cf72f532d1b.png';

  constructor(public reportService: ReportService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.reportChange("crosstab");
  }

  fileChange(e): void {
    const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    this.imgsrc = window.URL.createObjectURL(file); // 获取上传的图片临时路径
  }

  reportChange(name: string): void {
    this.reportSrc = 'http://localhost:8889/' + name + '?whereSql=cost%3C15&inline=true';
  }
}
