using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Editor_1._0.Models
{
    public class Picture
    {
        public int Id { set; get; }
        public string Name { set; get; }
        public string BgColor { set; get; }
        public byte[] Image { set; get; }
        public Author Author { set; get; }
        public int AuthorId { set; get; }
    }
}
