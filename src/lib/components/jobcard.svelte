<script>
    export let jobTitle = "Software Developer";
    export let jobDescription = "We are looking for a talented and motivated software developer to join our team.";
    export let jobExperience = "Experience: 2+ years";
    export let applyLink = "https://yourapplicationlink.com";


  </script>
  
  <style>
    .job-card {
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 300px;
      height: 300px;
      padding: 20px;
      text-align: center;
      position: relative;
      transition: transform 0.3s ease;
    }

    .job-card:hover {
    transform: scale(1.05); /* Increase the size on hover */
  }
  
    .job-title {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
    }
  
    .job-description {
      color: #666;
      margin-bottom: 15px;
      max-height: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  
    .job-experience {
      font-style: italic;
      color: #333;
      margin-bottom: 15px;
      position: static;
    }
  
    .apply-link {
      display: block;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      padding: 10px;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      position: absolute;
      bottom: 20px;
      left: 50%;
      margin-top: 10px; /* Adjusted margin-top */
      transform: translateX(-50%);
    }
  
    .apply-link:hover {
      background-color: #2980b9;
    }
  </style>
  
  <div class="job-card">
    <div class="job-title">{jobTitle}, Exp: {jobExperience}</div>
    <div class="job-description">{jobDescription}</div>
    <a href={applyLink} target='_blank' class="apply-link">Apply Now</a>
  </div>
  