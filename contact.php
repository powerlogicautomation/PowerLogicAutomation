<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Honeypot Spam Protection
    if(!empty($_POST['website'])) {
        die(); // Silent exit for bots
    }

    // Sanitize Inputs
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);

    // Validation
    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please complete the form and try again.";
        exit;
    }

    // Recipient Email
    $recipient = "info.powerlogicautomation@gmail.com";
    $subject = "New Inquiry from $name | Powerlogic Website";

    // Email Content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Phone: $phone\n\n";
    $email_content .= "Message:\n$message\n";

    // Email Headers
    $headers = "From: Powerlogic Website <no-reply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send Email
    if (mail($recipient, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "Thank You! Your message has been sent.";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }

} else {
    http_response_code(403);
    echo "There was a problem with your submission, please try again.";
}
?>