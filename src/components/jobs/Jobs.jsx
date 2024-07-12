import { Title } from "../titles/Title"
import './jobs.scss';

const myJobs = [
  {
    title: 'Backend Developer',
    companyName: 'Dara\' Services',
    companyImage: 'https://media.licdn.com/dms/image/D560BAQHQULrvHq8W5w/company-logo_200_200/0/1704317224818?e=1728518400&v=beta&t=sLMHo4k49vnEMzQ6H9SXqS4KzG0ki-YVWSYaMmFULmM',
    startDate: 'Oct 2023',
    endDate: 'Present',
    duration: new Date().getFullYear() - 2024 + new Date().getMonth() + 3,
    description: 'I have greatly promoted the scope of the company by developing the company\'s own and third-party services. I have led the development of some client services and developed ours from scratch. Develop taxi services, online stores, mobile recharges, package messaging and more using supabase as BaaS to improve app performance.',
    skills: [
      'Supabase',
      'Postgresql',
      'Deno',
      'Serverless'
    ]
  },
  {
    title: 'Full Stack Developer',
    companyName: 'Dasmex',
    companyImage: 'https://media.licdn.com/dms/image/C560BAQFWfZQOiB_vDw/company-logo_200_200/0/1634796340724?e=1728518400&v=beta&t=GuEMw0YitkHUZlYc-m8e-Xu5MtpCCY8fmxi1fEQ9x7o',
    startDate: 'Aug 2023',
    endDate: 'Nov 2023',
    duration: 4,
    description: 'At Biomas, I spearheaded the development of an innovative system to register and connect pets within an expansive community, streamlining the adoption process. I crafted a comprehensive shopping cart for diverse products and services, successfully integrating online payment gateways such as MercadoPago and PayPal. Furthermore, I designed an efficient system for registering animal professionals, enabling them to offer services to the community, while managing jobs, schedules, and new job inquiries seamlessly. My contributions significantly enhanced the growth and comprehensive functionality of the Biomas platform.',
    skills: [
      'Nextjs',
      'Typescript',
      'Postgresql',
      'Nestjs',
      'Tailwindcss',
      'Reactjs',
      'Graphql'
    ]
  },
  {
    title: 'Software Engineer',
    companyName: 'NTSprint',
    companyImage: 'https://media.licdn.com/dms/image/D4E0BAQHjVDJYr34DkA/company-logo_200_200/0/1690422912622?e=1728518400&v=beta&t=F2dMg8yJY8OLwIMgSGotL-KDtWdiI-2Vv4Tm9WlORfo',
    startDate: 'Feb 2023',
    endDate: 'Mar 2023',
    duration: 2,
    description: 'I have greatly promoted the scope of the company by developing the company\'s own and third-party services. I have led the development of some client services and developed ours from scratch. Develop taxi services, online stores, mobile recharges, package messaging and more using supabase as BaaS to improve app performance.',
    skills: [
      'ASP .NET',
      'SQL Server',
      'C#'
    ]
  }
]

export function Job() {
  return (
    <div id='works'>
      <Title text={"Work experience"} />

      <ol className="timeline">
        {myJobs.map((job, i) => (
          <li key={i} className="timeline-item">
            <div className="timeline-dot">
              <img src={job.companyImage} width={40} height={40} />
            </div>
            <h3 className="timeline-title">{job.title} at <span>{job.companyName}</span></h3>
            <div className="timeline-time">
              <time>{job.startDate} - {job.endDate}</time>
              <span>{` · ${job.duration} months`}</span>
            </div>
            <p className="timeline-text">{job.description}</p>
            <ul className="timeline-skills">
              {job.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

    </div>
  )
}