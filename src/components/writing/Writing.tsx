// components/writing/Writing.tsx
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Link,
  Divider,
  Box,
} from "@mui/material";

export interface WritingItem {
  title: string;
  image?: string;
  link?: string;
  contents?: string;
  align?: "left" | "center" | "right";
}

interface SectionData {
  preamble?: string;
  items: WritingItem[];
}

interface Props {
  writingsBySection: {
    [section: string]: SectionData;
  };
}

const CONTENTS_CUTOFF_LENGTH = 500;

const Writing: React.FC<Props> = ({ writingsBySection }) => {
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMarkdownPreviews = async () => {
      const previewsObj: Record<string, string> = {};

      const allItems = Object.values(writingsBySection)
        .flatMap((section) => section.items);

      await Promise.all(
        allItems.map(async (item) => {
          if (!item.contents) return;
          try {
            const response = await fetch(item.contents);
            const text = await response.text();
            previewsObj[item.title] = text;
          } catch (error) {
            previewsObj[item.title] = "Failed to load content.";
          }
        })
      );

      setPreviews(previewsObj);
    };

    fetchMarkdownPreviews();
  }, [writingsBySection]);

  const toggleExpand = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Box>
      {Object.entries(writingsBySection).map(([section, data]) => (
        <Box key={section} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {section.charAt(0).toUpperCase() + section.slice(1).replace(/_/g, " ")}
          </Typography>

          {data.preamble && (
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {data.preamble}
            </Typography>
          )}

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3} direction="column">
            {data.items.map((item) => {
              const fullText = previews[item.title] || (item.contents ? "Loading..." : "");
              const isExpanded = expanded[item.title];
              const displayText =
                fullText.length > CONTENTS_CUTOFF_LENGTH && !isExpanded
                  ? `${fullText.slice(0, CONTENTS_CUTOFF_LENGTH)}...`
                  : fullText;

              const textAlign = item.align || "left";

              return (
                <Grid key={item.title}>
                  <Card sx={{ display: "flex", flexDirection: "row" }}>
                    {item.image?.trim() && (
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.title}
                        sx={{
                          width: 160,
                          height: 160,
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                      <CardContent sx={{ textAlign }}>
                        <Typography variant="h6">{item.title}</Typography>

                        {item.link?.trim() && (
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <Link href={item.link} target="_blank" rel="noopener" underline="hover">
                              {item.link}
                            </Link>
                          </Typography>
                        )}

                        {item.contents && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ whiteSpace: "pre-line" }}
                          >
                            {displayText}
                          </Typography>
                        )}
                      </CardContent>

                      <CardActions sx={{ justifyContent: "right", px: 2 }}>
                        {fullText.length > CONTENTS_CUTOFF_LENGTH && (
                          <Button size="small" onClick={() => toggleExpand(item.title)}>
                            {isExpanded ? "Show Less" : "Show More"}
                          </Button>
                        )}
                      </CardActions>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default Writing;
