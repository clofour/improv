import ExternalLink from "@/components/external-link";

export default function Footer() {
  const sections = [
    {
      name: "Hack Club",
      links: [
        { label: "Philosophy", to: "https://hackclub.com/philosophy/" },
        { label: "Team", to: "https://hackclub.com/team/" },
        { label: "Donate", to: "https://hackclub.com/philanthropy/" },
      ],
    },
    {
      name: "Resources",
      links: [
        { label: "Slack", to: "https://slack.hackclub.com/" },
        { label: "Community Events", to: "https://events.hackclub.com/" },
        { label: "Workshops", to: "https://workshops.hackclub.com/" },
        { label: "Code of Conduct", to: "https://hackclub.com/conduct/" },
      ],
    }
  ];

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-6 sm:col-span-4">
        <div className="flex flex-col gap-3">
          <div className="text-5xl">Logo</div>
          <div>Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical high schoolers. We believe you learn best by building, so we're creating community and providing grants so you can make awesome projects. In the past few years, we've partnered with GitHub to run Summer of Making, hosted the world's longest hackathon on land, and ran Canada's largest high school hackathon.</div>
        </div>
      </div>
      {sections.map((section) => (
        <div key={section.name} className="col-span-6 sm:col-auto">
          <div className="flex flex-col gap-3">
            <p>{section.name}</p>
            <div className="flex flex-col gap-2">
              {section.links.map((link) => (
                <ExternalLink key={link.label} href={link.to}>
                  {link.label}
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}