using BookGuideAPI.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookGuideAPI.Application.ViewModel
{
    public class CurrentUserViewModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public User_Role Role { get; set; }
    }
}
