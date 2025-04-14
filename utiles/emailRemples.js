const  passwordresttemples= (name,resetLink)=>`
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    body{
        margin: 0px 50px;
    }
    .email-container{
        background-color: blue;
        border-radius: 20px;
        
    }

  </style>
</head>
<body>
    
    <div class="email-container">
<h2>password reset requst</h2>
<span>hi ${name}</span>
<p>click on below link to reset password  </p>
<a href="${resetLink}">reset password</a>

    </div>
</body>
</html>
`;

module.exports={passwordresttemples}