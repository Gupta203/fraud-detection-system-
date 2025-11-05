"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, MessageSquare, UserPlus, Share2 } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { notificationManager } from "@/lib/notification-service"

interface TeamMember {
  id: string
  name: string
  role: string
  status: "online" | "offline"
  avatar: string
}

interface CollaborationComment {
  id: string
  author: string
  timestamp: Date
  text: string
  mentions: string[]
}

export function TeamCollaboration() {
  const [teamMembers] = useState<TeamMember[]>([
    { id: "1", name: "John Admin", role: "Fraud Manager", status: "online", avatar: "JA" },
    { id: "2", name: "Sarah Analyst", role: "Analyst", status: "online", avatar: "SA" },
    { id: "3", name: "Mike Developer", role: "Engineer", status: "offline", avatar: "MD" },
  ])

  const [comments, setComments] = useState<CollaborationComment[]>([
    {
      id: "1",
      author: "John Admin",
      timestamp: new Date(Date.now() - 300000),
      text: "Just flagged 5 suspicious transactions. Recommend review.",
      mentions: [],
    },
    {
      id: "2",
      author: "Sarah Analyst",
      timestamp: new Date(Date.now() - 100000),
      text: "@John Admin Confirmed. 3 of them are definite fraud cases.",
      mentions: ["John Admin"],
    },
  ])

  const [newComment, setNewComment] = useState("")

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment: CollaborationComment = {
      id: String(comments.length + 1),
      author: "You",
      timestamp: new Date(),
      text: newComment,
      mentions: [],
    }

    setComments([...comments, comment])
    setNewComment("")
    notificationManager.success("Comment Added", "Your comment has been posted to the team")
  }

  const handleShare = () => {
    notificationManager.success("Report Shared", "Report link copied and sent to team members")
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Team Collaboration Hub</h2>
        <p className="text-muted-foreground">Collaborate with your team on fraud cases and alerts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Discussion Thread
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 pb-4 border-b border-border last:border-0">
                  <Avatar className="flex-shrink-0">
                    <AvatarFallback>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground text-sm">{comment.author}</p>
                      <span className="text-xs text-muted-foreground">{comment.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-foreground text-sm">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                className="bg-input border-border"
              />
              <Button onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Team Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{member.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div
                    className={`w-2 h-2 rounded-full ${member.status === "online" ? "bg-green-500" : "bg-gray-500"}`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Report
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
