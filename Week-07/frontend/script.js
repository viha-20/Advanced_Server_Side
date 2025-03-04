$(document).ready(function() {
    // API URL
    const apiUrl = "http://localhost:5000/api/users";
  
    // Function to get all users and display them
    function getAllUsers() {
      $.get(`${apiUrl}/getAllUsers`, function(data) {
        $('#usersList').empty(); // Clear previous users
        data.forEach(function(user) {
          $('#usersList').append(`
            <li>
              <span>${user.firstname} ${user.lastname} - ${user.email}</span>
              <button class="deleteUserBtn" data-id="${user._id}">Delete</button>
              <button class="editUserBtn" data-id="${user._id}">Edit</button>
            </li>
          `);
        });
      });
    }
  
    // Initial call to populate the user list
    getAllUsers();
  
    

    $('#createUserForm').submit(function(e) {
        e.preventDefault();
        
        const userData = {
          firstname: $('#firstname').val(),
          lastname: $('#lastname').val(),
          email: $('#email').val(),
          password: $('#password').val(),
        };
      
        console.log("Sending data:", userData); // Debugging log
      
        $.ajax({
          url: `${apiUrl}/create`,
          type: "POST",
          contentType: "application/json",  // Ensure JSON format
          data: JSON.stringify(userData),   // Convert data to JSON
          success: function(response) {
            console.log("User Created:", response); // Debugging log
            alert(response.msg);
            getAllUsers(); // Refresh users list
            $('#createUserForm')[0].reset();
          },
          error: function(err) {
            console.error("Error:", err.responseText);
            alert("Error: " + (err.responseJSON ? err.responseJSON.msg : "Unknown error"));
          }
        });
      });
      
  
    // Delete User
    $(document).on('click', '.deleteUserBtn', function() {
      const userId = $(this).data('id');
      
      $.ajax({
        url: `${apiUrl}/deleteUser/${userId}`,
        type: 'DELETE',
        success: function(response) {
          alert(response.msg);
          getAllUsers(); // Refresh the user list
        },
        error: function(err) {
          alert("Error: " + err.responseJSON.msg);
        }
      });
    });
  
    // Edit User (populate form with existing user data)
    $(document).on('click', '.editUserBtn', function() {
      const userId = $(this).data('id');
      
      $.get(`${apiUrl}/getUser/${userId}`, function(user) {
        $('#updateFirstname').val(user.firstname);
        $('#updateLastname').val(user.lastname);
        $('#updateEmail').val(user.email);
        $('#updatePassword').val('');
        $('#updateUserForm').data('userId', user._id); // Store user ID for updating
      });
    });
  
   
    $('#updateUserForm').submit(function(e) {
        e.preventDefault();
        const userId = $(this).data('userId');
    
        const updatedData = {
            firstname: $('#updateFirstname').val(),
            lastname: $('#updateLastname').val(),
            email: $('#updateEmail').val(),
            password: $('#updatePassword').val(),
        };
    
        $.ajax({
            url: `${apiUrl}/updateUser/${userId}`,
            type: 'PUT',
            contentType: 'application/json',  // Ensure JSON content type
            data: JSON.stringify(updatedData), // Convert to JSON format
            success: function(response) {
                alert("User updated successfully");
                getAllUsers(); // Refresh user list
                $('#updateUserForm')[0].reset();
            },
            error: function(err) {
                alert("Error: " + (err.responseJSON?.msg || "Unknown error"));
            }
        });
    });
    
      
  });
  