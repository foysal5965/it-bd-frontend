export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  data: any ;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
  data?:string
};


export interface ICourseCategory {
  id: string;
  categoryName: string,
  image: string,
  createdAt: string;
  updatedAt: string;
}

export interface ICourse {
  id: string,
  courseName: string,
  duration: string,
  lectures: number,
  projects: string,
  image: string,
  courseOverView: string,
  courseCurriculum: string[],
  courseFee: number,
  categoryId: string
}

export type IStudent = {
  id: string;                     // Unique identifier
  name: string;                   // Student's name
  email: string;                  // Unique email address
  profilePhoto?: string;          // Optional profile photo URL
  contactNumber: string;          // Contact number of the student
  isDeleted: boolean;             // Indicates if the student is deleted
  createdAt: Date;                // Timestamp when the student record was created
  updatedAt: Date;                // Timestamp when the student record was last updated
  user: User;                     // Associated User model (define the User type separately)
  StudentEnrolledCourse: StudentEnrolledCourse[]; // List of enrolled courses
};
export type IAdmin = {
  id: string;                     // Unique identifier
  name: string;                   // Student's name
  email: string;                  // Unique email address
  profilePhoto?: string;          // Optional profile photo URL
  contactNumber: string;          // Contact number of the student
  isDeleted: boolean;             // Indicates if the student is deleted
  createdAt: Date;                // Timestamp when the student record was created
  updatedAt: Date;                // Timestamp when the student record was last updated
  user: User; 
};

// Define User type (if not already defined)
export type User = {
  id:string;
  role:string;
  password:string;
  email: string;                 // Unique email
  // Other user fields as necessary
};

export type StudentEnrolledCourse = {
  courseId: string;             // Course identifier
  // Other fields related to the enrolled course as necessary
};

export type IContest ={
  id:string,
  name:string,
  startTime:string,
  endTime:string,
  description:string,
  rules:string,
  rewards:string
}

