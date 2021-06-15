using System;

namespace RgsNordic.Model
{
  public class SiteGridCell
  {
    public Guid Id { get; set; }
    public Guid SiteId { get; set; }
    public virtual Site Site { get; set; }
    public int Col { get; set; }
    public int Row { get; set; }
    public Guid CaseId { get; set; }
    public virtual Case Case { get; set; }
  }
}