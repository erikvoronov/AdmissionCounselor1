import {Component} from '@angular/core';
import {UniversityService} from "../services/university.service";
import {JsonPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {SortPipe} from "../sort.pipe";
import {NgbPopover} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'school-chooser',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgClass,
    SortPipe,
    NgIf,
    NgbPopover
  ],
  templateUrl: './school-chooser.component.html',
  styleUrl: './school-chooser.component.less'
})
export class SchoolChooserComponent {

  schools;
  schoolStudentMap = {};

  constructor(private schoolService: UniversityService) {
    this.subscribeToSchools();
  }

  private addEnrolledStudents(selectedStudents: any[]): void {
    const schoolName = this.getSelectedSchool().name;
    let schoolStudents = this.schoolStudentMap[schoolName];

    if (!schoolStudents) {
      this.schoolStudentMap[schoolName] = schoolStudents = [];
    }

    schoolStudents.push(...selectedStudents);
  }

  private subscribeToSchools(): void {
    this.schoolService.data
      .subscribe(schools => this.schools = schools);
  }

  buildSchoolName(school): string {
    const schoolName = school.name;
    const country = school.alpha_two_code;

    return `${schoolName} (${country})`;
  }

  buildSchoolLinkDisplay(school): string {
    const linkName = school.domains[0];
    return linkName.charAt(0).toUpperCase() + linkName.slice(1);
  }

  selectSchool(school): void {
    if (school.isSelected) {
      school.isSelected = false;
      return;
    }

    this.deselect();

    school.isSelected = true;
  }

  getStudentCount(school: any): number {
    const students = this.getEnrolledStudents(school);
    return students?.length;
  }

  getEnrolledStudents(school: any): any[]{
    return this.schoolStudentMap[school.name];
  }

  getSelectedSchool(): any {
    return this.schools.find(s => s.isSelected);
  }

  deselect(): void {
    const selectedSchool = this.schools.find(s => s.isSelected);
    selectedSchool && (selectedSchool.isSelected = false);
  }

  enroll(students: any[]) {
    this.addEnrolledStudents(students);
    this.deselect();
  }

  undoEnroll(school: any): void {
    let students = this.getEnrolledStudents(school);
    students.forEach(s => s.isEnrolled = false);
    students.length = 0;
  }
}
