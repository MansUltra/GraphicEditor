using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace Editor_1._0.ViewModels
{
    [Keyless]
    public class RegisterModel
    {
        [Required(ErrorMessage = "Не указано Имя")]
        public string Fname { get; set; }
        
        [Required(ErrorMessage = "Не указана Фамилия")]
        public string Sname { get; set; }
    
        [Required(ErrorMessage = "Не указан Возраст")]
        public int Age { get; set; }
    
        [Required(ErrorMessage = "Не указан Email")]
        public string Mail { get; set; }

        [Required(ErrorMessage = "Не указан пароль")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Пароль введен неверно")]
        public string ConfirmPassword { get; set; }
    }
}
