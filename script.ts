const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

const generateResumeHTML = async (): Promise<string> => {
    // Get all inputs
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const addressInput = document.getElementById('address') as HTMLTextAreaElement;
    const institutionInput = document.getElementById('institution') as HTMLInputElement;
    const degreeInput = document.getElementById('degree') as HTMLInputElement;
    const graduationDateInput = document.getElementById('graduation-date') as HTMLInputElement;
    const skillsInput = document.getElementById('skills') as HTMLTextAreaElement;
    const companyInput = document.getElementById('company') as HTMLInputElement;
    const positionInput = document.getElementById('position') as HTMLInputElement;
    const startDateInput = document.getElementById('start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('end-date') as HTMLInputElement;
    const responsibilitiesInput = document.getElementById('responsibilities') as HTMLTextAreaElement;
    const aboutInput = document.getElementById('about-me') as HTMLTextAreaElement;
    const photoInput = document.getElementById('photo') as HTMLInputElement | null;

    // Basic validation
    if (!nameInput || !emailInput || !phoneInput || !addressInput ||
        !institutionInput || !degreeInput || !graduationDateInput ||
        !skillsInput || !companyInput || !positionInput ||
        !startDateInput || !endDateInput || !responsibilitiesInput) {
        alert('Please ensure all required fields are present.');
        return '';
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const photoBase64 = photoInput && photoInput.files?.[0] ? await fileToBase64(photoInput.files[0]) : '';

    const institution = institutionInput.value.trim();
    const degree = degreeInput.value.trim();
    const graduationDate = graduationDateInput.value.trim();
    const skills = skillsInput.value.trim();
    const company = companyInput.value.trim();
    const position = positionInput.value.trim();
    const startDate = startDateInput.value.trim();
    const endDate = endDateInput.value.trim();
    const responsibilities = responsibilitiesInput.value.trim();
    const about = aboutInput ? aboutInput.value.trim() : '';

    if (!name || !email || !phone || !address || !institution ||
        !degree || !graduationDate || !skills || !company ||
        !position || !startDate || !endDate || !responsibilities) {
        alert('Please fill in all required fields.');
        return '';
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return '';
    }

    const phonePattern = /^\d{11}$/;  
    if (!phonePattern.test(phone)) {
        alert('Please enter a valid phone number (11 digits).');
        return '';
    }

    // Validate dates (simple check)
    if (new Date(startDate) > new Date(endDate)) {
        alert('End date cannot be before the start date.');
        return '';
    }

    // Generate resume HTML
    return `
         <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <style>
        .resume-container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            border: 1px solid #000829;
            background-color: #93a8cb;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Header Styling */
        .resume-header h1 {
            color: #fff; 
            margin: 0;
            padding: 10px;
            border-radius: 5px;
            background-color: #05005e; 
            border: 2px solid black; 
            font-size: 24px;
        }
        
        .resume-header p {
            font-size: 16px;
            margin: 5px 0;
        }

        /* Personal Information Section Styling */
        .resume-header {
            background-color: #f9f9f9;
            border: 1px solid #ddd; 
            border-radius: 8px;
            padding: 20px; 
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
            margin-bottom: 20px; 
        }

        /* Profile Image Styling */
        .resume-header img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            display: block;
            margin: 20px auto;
            box-shadow: 0 4px 12px #05005e; 
            transition: box-shadow 0.3s ease; 
        }

        /* About Me Section Styling */
        .about-me {
            color: #000000;
            background-color: #f9ffff;
            border: none;
            font-size: 20px;
            padding: 5px;
            margin-top: 10px; 
            border-bottom: 2px solid #ddd;
        }

        .resume-section {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ddd; 
            border-radius: 8px;
            background-color: #f9f9f9;
        }

        .resume-section h2 {
            color: #fff; 
            margin: 0;
            padding: 10px;
            border-radius: 5px;
            background-color: #05005e; 
            border: 2px solid black; 
            font-size: 24px;
        }

        /* Education Section Styling */
        .education-container {
            margin-bottom: 50px; 
        }

        .education-container.hidden {
            display: none; 
        }

        .education ul {
            list-style-type: none; 
            padding: 0;
        }

        .education li {
            margin-bottom: 15px; 
            padding: 10px;
            border: 1px solid #ddd; 
            border-radius: 5px; 
            background-color: #fff; 
        }

        /* Work Experience Section Styling */
        .work-experience-container {
            margin-bottom: 50px; 
        }

        .work-experience-container.hidden {
            display: none; 
        }

        .work-experience ul {
            list-style-type: none; 
            padding: 0;
        }

        .work-experience li {
            margin-bottom: 15px; 
            padding: 10px;
            border: 1px solid #ddd; 
            border-radius: 5px; 
            background-color: #fff; 
        }

        /* Skills Section Styling */
        .skills-container {
            margin-bottom: 50px; 
        }

        .skills-container.hidden {
            display: none; 
        }

        .skill {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            margin-bottom: 15px; 
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        .skill-name {
            font-size: 16px;
            color: #333;
        }

        /* Button Styling */
        button {
            display: inline-block;
            padding: 10px 15px;
            font-size: 16px;
            color: #fff;
            background-color: #003366; 
            border: 2px solid black; 
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            transition: background-color 0.3s ease, transform 0.2s ease; 
        }

        button:hover {
            background-color: #002244; 
            transform: translateY(-2px); 
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <div class="resume-header">
            ${photoBase64 ? `<img src="${photoBase64}" alt="Photo"/>` : '<p>No photo available</p>'}
            <h1>${name}</h1>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Address: ${address}</p>
        </div>
          <div class="resume-section about-me">
            <h2>About</h2>
            <p>${about}</p>
        </div>
        <div class="resume-section education-container">
            <h2>Education</h2>
            <p><strong>Institution: ${institution}</strong></p>
            <p>Degree: ${degree}</p>
            <p>Graduation Date: ${graduationDate}</p>
        </div>
         <div class="resume-section work-experience-container">
            <h2>Work Experience</h2>
            <p><strong>${company}</strong> - ${position}</p>
            <p>Start Date: ${startDate}</p>
            <p>End Date: ${endDate || 'Present'}</p>
            <p>Responsibilities: ${responsibilities}</p>
        </div>
        <div class="resume-section skills-container">
            <h2>Skills</h2>
            <p>${skills}</p>
        </div>
       
    </div>
</body>
</html>
`
};

// Function to populate form with resume data
const populateFormWithResumeData = (resumeHTML: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(resumeHTML, 'text/html');
    
    // Extract values from the HTML
    const name = doc.querySelector('.resume-header h1')?.textContent || '';
    const email = doc.querySelector('.resume-header p:nth-of-type(1)')?.textContent.replace('Email: ', '') || '';
    const phone = doc.querySelector('.resume-header p:nth-of-type(2)')?.textContent.replace('Phone: ', '') || '';
    const address = doc.querySelector('.resume-header p:nth-of-type(3)')?.textContent.replace('Address: ', '') || '';
    const about = doc.querySelector('.resume-section.about-me p')?.textContent || '';
    const institution = doc.querySelector('.education-container p:nth-of-type(1)')?.textContent.replace('Institution: ', '') || '';
    const degree = doc.querySelector('.education-container p:nth-of-type(2)')?.textContent.replace('Degree: ', '') || '';
    const graduationDate = doc.querySelector('.education-container p:nth-of-type(3)')?.textContent.replace('Graduation Date: ', '') || '';
    const company = doc.querySelector('.work-experience-container p strong')?.textContent || '';
    const position = doc.querySelector('.work-experience-container p:nth-of-type(1)')?.textContent.replace(`${company} - `, '') || '';
    const startDate = doc.querySelector('.work-experience-container p:nth-of-type(2)')?.textContent.replace('Start Date: ', '') || '';
    const endDate = doc.querySelector('.work-experience-container p:nth-of-type(3)')?.textContent.replace('End Date: ', '') || '';
    const responsibilities = doc.querySelector('.work-experience-container p:nth-of-type(4)')?.textContent.replace('Responsibilities: ', '') || '';
    const skills = doc.querySelector('.skills-container p')?.textContent || '';
    
    // Populate the form with these values
    (document.getElementById('name') as HTMLInputElement).value = name;
    (document.getElementById('email') as HTMLInputElement).value = email;
    (document.getElementById('phone') as HTMLInputElement).value = phone;
    (document.getElementById('address') as HTMLTextAreaElement).value = address;
    (document.getElementById('institution') as HTMLInputElement).value = institution;
    (document.getElementById('degree') as HTMLInputElement).value = degree;
    (document.getElementById('graduation-date') as HTMLInputElement).value = graduationDate;
    (document.getElementById('skills') as HTMLTextAreaElement).value = skills;
    (document.getElementById('company') as HTMLInputElement).value = company;
    (document.getElementById('position') as HTMLInputElement).value = position;
    (document.getElementById('start-date') as HTMLInputElement).value = startDate;
    (document.getElementById('end-date') as HTMLInputElement).value = endDate;
    (document.getElementById('responsibilities') as HTMLTextAreaElement).value = responsibilities;
    (document.getElementById('about-me') as HTMLTextAreaElement).value = about;
};

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate-resume') as HTMLButtonElement;
    const resumeOutput = document.getElementById('resume-output') as HTMLElement;
    const resumeContent = document.getElementById('resume-content') as HTMLElement;
    const editButton = document.getElementById('edit-resume') as HTMLButtonElement;
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;

    let currentResumeHTML: string = '';

    generateButton.addEventListener('click', async () => {
        currentResumeHTML = await generateResumeHTML();
        if (currentResumeHTML) {
            resumeContent.innerHTML = currentResumeHTML;
            resumeOutput.classList.remove('hidden');
            editButton.classList.remove('hidden');
        }
    });

    editButton.addEventListener('click', () => {
        // Show the form and hide the resume output
        populateFormWithResumeData(currentResumeHTML);
        resumeOutput.classList.add('hidden');
        resumeForm.scrollIntoView();
    });

    // Optionally handle form submission to regenerate the resume
    resumeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        currentResumeHTML = await generateResumeHTML();
        if (currentResumeHTML) {
            resumeContent.innerHTML = currentResumeHTML;
            resumeOutput.classList.remove('hidden');
            editButton.classList.remove('hidden');
        }
    });
});
