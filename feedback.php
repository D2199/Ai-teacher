
<?php
$name = $_POST['name'];
$email = $_POST['email'];
$feedback = $_POST['feedback'];

// Validation
if (empty($name) || empty($email) || empty($feedback)) {
  echo "Please fill in all fields.";
  exit;
}

// Send email
$to = "your_email@example.com"; // Replace with your email
$subject = "Feedback from $name";
$message = "Name: $name\nEmail: $email\nFeedback: $feedback";
$headers = "From: $email";

mail($to, $subject, $message, $headers);

echo "Thank you for your feedback!";
?>
