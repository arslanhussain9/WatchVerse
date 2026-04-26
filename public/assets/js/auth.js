document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login__form');
    const signupForm = document.querySelector('.signup__form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = 'index.html';
                } else {
                    alert(data.msg || 'Login failed');
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred');
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = signupForm.name.value;
            const email = signupForm.email.value;
            const password = signupForm.password.value;

            try {
                const res = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                if (res.ok) {
                    alert('Registration successful! Please log in.');
                    window.location.href = 'login.html';
                } else {
                    alert(data.msg || 'Signup failed');
                }
            } catch (err) {
                console.error(err);
                alert('An error occurred');
            }
        });
    }
});
